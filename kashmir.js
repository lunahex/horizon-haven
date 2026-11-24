minikube start

kubectl create deployment web --image=nginx

kubectl get deployments
kubectl get pods

kubectl expose deployment web --type=NodePort --port=8086 --target-port=80

kubectl get svc

minikube service web --url

kubectl port-forward deployment/web 8086:80

kubectl scale deployment web --replicas=6

kubectl get pods -o wide

kubectl delete pod <pod_name>

kubectl get pods

kubectl set image deployment/web nginx=nginx:latest

kubectl rollout status deployment/web
-----------------------------------------------------------------------------------------------------
docker pull jasonrivers/nagios:latest

docker images

docker run -d --name mynagios -p 8888:80 jasonrivers/nagios:latest

docker ps

docker logs mynagios

docker stop mynagios

docker start mynagios

docker restart mynagios

docker exec -it mynagios bash

docker rm -f mynagios
