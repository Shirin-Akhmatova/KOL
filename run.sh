sudo docker volume create frontend_dist
sudo docker-compose -f .devops/frontend.yml up --build -d
sudo docker restart kol_nginx
