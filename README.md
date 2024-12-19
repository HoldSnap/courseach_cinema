# Test Work Node

## Запуск проекта
Убедитесь , что у вас установлен docker
1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/HoldSnap/courseach_cinema
   cd courseach_cinema/backend
   ```

2. Запустите контейнеры:
   Перед запуском убедитесь, что вы в папке backend, т.к именно там находится docker-compose

    для linux
   ```bash
    docker-compose up -d --build && docker-compose exec backend npx sequelize-cli db:migrate && docker-compose exec backend npx sequelize-cli db:seed:all
   ```

4. Доступ к приложению:
   - Фронтенд: [http://localhost:5173](http://localhost:5173)
   - Бэкенд: [http://localhost:3000](http://localhost:3000)

