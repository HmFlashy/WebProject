//Config for the database

var config = {
  user: 'wbtbldxuwrtejb', //env var: PGUSER
  database: 'dabj3churog5bd', //env var: PGDATABASE
  password: '24f9964db4ea46a7cf7f13a8d160b4d83ad8c8151f25affcc782e751578d114f', //env var: PGPASSWORD
  host: 'ec2-46-137-97-169.eu-west-1.compute.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
};

module.exports = config;
