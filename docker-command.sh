docker run --name ecoresponsable-postgres \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_USER=chapuis \
  -e POSTGRES_DB=mydb \
  -v /Users/58122J/Developer/JulienChapuis/db:/var/lib/postgresql/data \
  -p 5222:5432 \
  -d postgres