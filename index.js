const fs = require('fs');

module.exports = function get_recurscive_files_array (dir) {

    let files = [];
    let dirs_to_scan = [];

    function crawl_dir (path) {

        if (!path.endsWith('/')) path += '/';

        fs.readdirSync(path).forEach(
            x => {
                let new_path = `${path}${x}`;

                if (fs.statSync(new_path).isFile()) {
                    files.push(new_path);
                } else dirs_to_scan.push(new_path);
            }
        );
        
    }

    crawl_dir(dir);

    while (true) {
        try {
            crawl_dir(dirs_to_scan.pop());
        } catch (e) {
            return files;
        }
    }
}
