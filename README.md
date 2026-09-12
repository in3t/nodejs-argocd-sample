# Node.js + Argo CD sample

A compact Express service and GitOps manifests for deploying it with Argo CD.

## Run it locally

```sh
npm install
npm start
```

Open `http://localhost:3000`. Health endpoints are available at `/healthz` and `/readyz`.

## Build and publish the image

From this directory, replace the image name with your container registry location:

```sh
docker build -t ghcr.io/YOUR_GITHUB_USER/nodejs-argocd-sample:1.0.0 .
docker push ghcr.io/YOUR_GITHUB_USER/nodejs-argocd-sample:1.0.0
```

Update `k8s/deployment.yaml` to use that exact image. If your image is private, configure an `imagePullSecret` in the target Kubernetes namespace before syncing.

## Deploy through Argo CD

1. Commit and push this folder to a Git repository.
2. In `argocd/application.yaml`, replace the two `REPLACE_WITH...` values with your GitHub user and repository name.
3. Apply the Argo CD Application from a machine connected to the cluster:

   ```sh
   kubectl apply -f argocd/application.yaml
   ```

Argo CD watches `k8s/` in the repository and deploys it into the `demo` namespace. Automated sync, pruning, self-healing, and namespace creation are enabled.

## Check the deployment

```sh
kubectl get pods -n demo
kubectl port-forward service/nodejs-argocd-sample 8080:80 -n demo
```

Then visit `http://localhost:8080`.
