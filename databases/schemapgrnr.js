const client = require('./dbpgrnr.js');

function createSchemaAndTable() {
  const schemaName = 'rnr';
  const tableName = 'reviews';

  const createSchema = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
  const createTable = `
    CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
      id serial PRIMARY KEY,
      product_id numeric(50) NOT NULL,
      rating numeric(50) NOT NULL,
      date varchar(50),
      summary varchar(500),
      body varchar(1000),
      recommend boolean,
      reported boolean,
      reviewer_name varchar(50),
      reviewer_email varchar(50),
      response varchar(500),
      helpfulness numeric (50)
    )
  `;

  client.query(createSchema, (schemaErr) => {
    if (schemaErr) {
      console.error('Error creating schema:', schemaErr);
      client.end();
      return;
    }

    console.log(`Schema "${schemaName}" created or already exists`);

    client.query(createTable, (tableErr) => {
      if (tableErr) {
        console.error('Error creating table:', tableErr);
      } else {
        console.log(`Table "${tableName}" created or already exists in schema "${schemaName}"`);
      }

      client.end();
    });
  });
}

createSchemaAndTable ();

