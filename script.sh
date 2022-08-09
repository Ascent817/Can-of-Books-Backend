echo Pulling, adding, and commiting with message: "$1"
git pull
git add .
git commit -m "$1"
git push
echo All actions finished successfully!