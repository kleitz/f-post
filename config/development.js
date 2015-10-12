module.exports = {
    session: {
      secret: "123",
      key: "123"
    },
    defaults: {
      scheema: {
        user: {
          category: {
            1: "admin"
            , 2: "client admin"
            , 3: "client employee"
          },
        },
      },
      system:{

      }
    },
    global: {
        mimetypes: ["image/png", "image/jpg", "image/jpeg"], //VIDEO ?
        secret: "123",
        paths: {
          tmp: './tmp/',
          sources: '/var/www/fb-post/public/sources/',
          publicsources: 'http://localhost/sources/'
        },
        app: {
          endpoint: "http://localhost/"
          , name: "FbPost"
          , noreplyemail: "noreply@fbpost.com.br"
        }
    },
    mongodb: {
      db: { native_parser: true }
      , server: { poolSize: 5 }
      // , replset: { rs_name: '' }
      , user: ''
      , pass: ''
      , host: "localhost"
      , port: "27017"
      , name: "fb-post"
    },
    // redis: {
    //     host: 'localhost',
    //     port: 6379
    // },
    // newrelic: {
    //     app_name: 'ImobManager-NodeJS-Localhost',
    //     license_key: '5ab9758de03a288bd7593cdb51063ec3150cf344',
    //     level: 'info'
    // },
    // cdn: {
    //     media_dir_sync: './uploads'
    // },
}
