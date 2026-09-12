# Node.js Argo CD Demo

This sample deploys a small Node.js HTTP service with Argo CD.

## 1. Build and push the image

Replace `your-dockerhub-user` with your container registry username:

```powershell
docker build -t docker.io/your-dockerhub-user/nodejs-argocd-demo:1.0.0 .
docker push docker.io/your-dockerhub-user/nodejs-argocd-demo:1.0.0
```

Update the same image value in `k8s/deployment.yaml`.

## 2. Push this directory to Git

Update `argocd/application.yaml` so `repoURL` points to the Git repository containing this directory, then commit and push:

```powershell
git add nodejs-argocd-demo
git commit -m "Add Node.js Argo CD demo"
git push
```

## 3. Create the Argo CD application

Run this from a machine with access to the Kubernetes cluster:

```powershell
kubectl apply -f nodejs-argocd-demo/argocd/application.yaml
kubectl get application nodejs-demo -n argocd
kubectl get pods,svc -n nodejs-demo
```

The service is internal to the cluster. Test it with port-forwarding:

```powershell
kubectl port-forward svc/nodejs-demo 8080:80 -n nodejs-demo
```

Then open `http://localhost:8080`.