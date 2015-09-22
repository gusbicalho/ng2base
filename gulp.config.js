module.exports = function() {
  // Pega informações do arquivo tsconfig.
  var tsconfig = require('./tsconfig.json');
  var temp = '.temp/';
  var src = 'src/';

  var config = {
    /** Diretório de arquivos compilados para dev */
    temp: temp,
    /** Arquivos fonte */
    src: src,
    /**
     * Arquivos principais do app
     * (processamento parte recursivamente daqui)
     */
    tsMain: tsconfig.files,
    tsconfig: tsconfig,
    /** Nome do bundle gerado pelo browserify */
    jsBundle: 'bundle.js',
    /** index do app */
    index: src + 'index.html',
    /** Porta do servidor de dev */
    devServerPort: 5000,
    /** Recarregar a página se algum desses arquivos mudar */
    watchReload: [
      src + '**/*',
      '!' + src + '**/*.ts'
    ],
  };

  return config;
};
