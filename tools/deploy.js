const tar = require('tar-fs');
const fs  = require('fs');
const { Client } = require('ssh2');

/* Deploy settings */
const settings = {
   remote_dir: '/var/www/mc.obvilion.ru/',
   local_dir: './build/',
   cache_dir: './tools/',
   tar_name: 'temp-deployment.tar',

   ssh: {
      host: '185.200.244.164',
      port: 22,
      username: 'root',
      privateKey: fs.readFileSync('C:/Users/Fatonn/.ssh/private_obvilion_fatonn'),
   }
};

/* Path to tar files */
const path_to_tar = settings.cache_dir + settings.tar_name;
const path_to_tmp_tar = settings.remote_dir + settings.tar_name;

/* Server commands
 * P.s: donedone is error flag for close stream */
const clean_command  = `find ${settings.remote_dir} -not -name .htaccess -not -name ${settings.tar_name} -delete`
const tar_command    = `cd ${settings.remote_dir} && tar -xf ${path_to_tmp_tar} && chmod -R 755 ${settings.remote_dir}`
const rm_tar_command = `rm ${path_to_tmp_tar}`

tar.pack(settings.local_dir)
   .pipe(fs.createWriteStream(path_to_tar));

const conn = new Client();

conn.on('ready', async () => {
   console.log('Deployment :: SFTP connection ready');

   const sftp = await new Promise((resolve, reject) =>
      conn.sftp((e, sftp) => e ? reject(e) : resolve(sftp)));

   console.log("Deployment :: pushing...");

   await new Promise((resolve, reject) =>
      sftp.fastPut(path_to_tar, path_to_tmp_tar, (e) => e ? reject(e) : resolve()));

   console.log("Deployment :: push complete, cleaning...");
   await execute(clean_command);

   console.log("Deployment :: cleaning complete, dearchiving...");
   await execute(tar_command);

   console.log("Deployment :: dearchived, cleaning up...");
   await execute(rm_tar_command);

   fs.unlinkSync(path_to_tar);

   console.log("Deployment :: cleaned up");
   conn.end();
});

const execute = async (cmd) => {
   const stream = await new Promise((resolve, reject) =>
      conn.exec(cmd, (e, stream) => e ? reject(e) : resolve(stream)));

   stream.on('data', (data) => console.log('STDOUT: ' + data));

   await new Promise((resolve, reject) => {
      stream.stderr.on('data', (data) => {
         if (data.toString().includes('Directory not empty')) {
            resolve();
            return;
         }

         console.log('STDERR: ' + data);
      });

      stream.on('close', () => resolve())
   });
}

conn.connect(settings.ssh);
