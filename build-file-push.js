var utils = require('./config/utils');


var destination_path = "/Users/chenglulu/Documents/my-project/vue/chengllNice.github.io/react-store-admin";
var source_path = "/Users/chenglulu/Documents/my-project/react/react-store-admin/build/*";
utils.exec(
    `cd ${destination_path} && rm -rf ./* && cp -r ${source_path} ${destination_path} && cd ../ && npm run auto:online 'react-store-admin'`
);