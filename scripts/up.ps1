#
#   Builds and run the docker image...
#

Get-ChildItem

docker build -t fsuy:ddr .
docker run  --rm -p 4817:4817 fsuy:ddr
