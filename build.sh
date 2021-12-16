docker build -t jagluck/beach-site .
docker tag jagluck/beach-site jagluck/beach-site:latest
docker push jagluck/beach-site:latest
kubectl delete -f beach-site.yaml
kubectl apply -f beach-site.yaml
kill -9 $(lsof -t -i:3000 -sTCP:LISTEN)
sleep 10s
kubectl -n default port-forward deployment.apps/beach 3000:3000