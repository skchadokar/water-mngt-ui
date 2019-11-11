module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./src/components/app.js",
          watch: true,
          instance_var: 'INSTANCE_ID',
          env: {
              "PORT": 3000,
              "NODE_ENV": "production"
          }
        }
    ]
  }