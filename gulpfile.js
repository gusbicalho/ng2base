var gulp = require('gulp');
// args: pega os argumentos da linha de comando como array
var args = require('yargs').argv;
// config: nosso arquivo de configuração
var config = require('./gulp.config')();
// plugins: Carrega todos os módulos gulp-*
var plugins = require('gulp-load-plugins')();
// browserify e watchify
var browserify = require('browserify');
var watchify = require('watchify');
// source: transforma o output do browserify em um objeto que
// o gulp consegue manipular
var source = require('vinyl-source-stream');
// Deleta arquivos
var del = require('del');

gulp.task('dev', ['dev-watchify', 'dev-serve', 'dev-watch-styles']);

gulp.task('dev-serve', function() {
  log('Iniciando servidor: [' +
      [].concat(config.temp).concat(config.src).join(', ') +
      ']');
  var port = args.port || config.devServerPort;
  plugins.connect.server({
    root: [config.temp, config.src],
    fallback: config.index,
    port: port,
    livereload: true
  });
  gulp.watch(config.watchReload, function() {
    return gulp.src(config.watchReload, {read: false})
            .pipe(plugins.connect.reload());
  });
});

gulp.task('dev-watchify', function() {
  log('Iniciando watchify');
  // Cria o bundler watchify
  var bundler = watchify(browserify(config.tsMain, watchify.args));
  // Ativa o tsify para transpilar nossos arquivos TS
  bundler.plugin('tsify', config.tsconfig);
  // Sempre que houver mudança, gera novo bundle
  bundler.on('update', watchifyBundle);
  bundler.on('log', log); // Escreve logs no terminal

  return watchifyBundle();

  function watchifyBundle() {
    return bundler.bundle()
      .on('error',
         plugins.util.log.bind(plugins.util, 'Browserify Error'))
      .pipe(source(config.jsBundle))
      .pipe(gulp.dest(config.temp))
      .pipe(plugins.connect.reload());
  }
});

gulp.task('dev-styles-clean', function(cb) {
  clean([config.temp + '**/*.css'], cb);
});
gulp.task('dev-styles', ['dev-styles-clean'], function() {
  log('Compilando Sass -> CSS');
  return gulp
    .src(config.sass)
    .pipe(plugins.plumber())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp))
    .pipe(plugins.connect.reload());
});
gulp.task('dev-watch-styles', ['dev-styles'], function() {
    gulp.watch([config.sass], ['dev-styles']);
});

///////////////////////////////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        plugins.util.log(plugins.util.colors.blue(msg[item]));
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.blue(msg));
  }
}

function clean(path, done) {
    log('Limpando: ' + plugins.util.colors.blue(path));
    del(path)
      .then(
        function(paths) { done(null, paths); },
        function(err) { done(err); });
}