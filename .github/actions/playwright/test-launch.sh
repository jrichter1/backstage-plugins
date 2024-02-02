root=$(pwd)
cd packages/backend

echo "Starting backend"
logfile=$(mktemp)
yarn start >$logfile 2>&1 &
backend=$!

for attempt in $(seq 1 45); do
  sleep 1
  if grep -q "Listening on" $logfile; then
    echo "Backend started"
    break
  fi
  if [[ attempt -eq 45 ]]; then
    echo "Failed to launch backend"
    cat $logfile
    exit 1
  fi
done

cd $root/plugins
for f in */; do
  if [[ ! -L "$f" && -f "$f/package.json" ]]; then
    cd $f
    
    if npm run | grep ui-test -q; then
      echo "Starting $f plugin"
      tmpfile=$(mktemp)
      yarn start >$tmpfile 2>&1 &
      plugin=$!

      for attempt in $(seq 1 45); do
        sleep 1
        if grep -q "webpack compiled successfully" $tmpfile; then
          echo "$f started"
          break
        fi
        if [[ attempt -eq 45 ]]; then
          echo "Failed to launch $f"
          cat $tmpfile
          exit 1
        fi
      done

      yarn run ui-test
      kill $plugin
      echo $f shut down
    fi
    cd $root/plugins
  fi
done

kill $backend
echo "Backend shut down"
