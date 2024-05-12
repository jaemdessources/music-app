echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* dev@10.0.0.39:/var/www/174.48.6.221/

echo "Done !"
echo "==========================================="
