param(
    [string]$ProjectId = "qualified-abode-471808-a8",
    [string]$AppName = "ant",      
    [string]$Region = "asia-southeast1",
    [string]$Memory = "2Gi",
    [string]$CPU = "2"
)

Write-Host "Setting GCP Project to $ProjectId ..."
gcloud config set project $ProjectId

Write-Host "`nCurrent gcloud config:"
gcloud config list

Write-Host "`nBuilding Docker image..."
docker build -t "gcr.io/$ProjectId/$AppName" .

Write-Host "`nConfiguring Docker authentication for GCR..."
gcloud auth configure-docker

Write-Host "`nPushing image to GCR..."
docker push "gcr.io/$ProjectId/$AppName"

Write-Host "`nListing image tags..."
gcloud container images list-tags "gcr.io/$ProjectId/$AppName"

Write-Host "`nDeploying to Cloud Run..."
gcloud run deploy $AppName `
    --image "gcr.io/$ProjectId/$AppName" `
    --platform managed `
    --region $Region `
    --memory $Memory `
    --cpu $CPU `
    --allow-unauthenticated

Write-Host "`nDeployment finished successfully!"