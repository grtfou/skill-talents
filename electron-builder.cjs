// 兩個平台都將 Electron 一起包入；使用者不需要安裝任何開發工具。
module.exports = {
  appId: 'io.skilltalents.desktop',
  productName: '符文之路',
  asar: true,
  directories: { output: 'release', buildResources: 'build' },
  files: ['app/**/*', 'desktop/**/*', 'package.json'],
  artifactName: 'SkillTalents-${version}-${os}-${arch}.${ext}',
  npmRebuild: false,
  publish: null,
  mac: {
    target: [{ target: 'zip', arch: ['x64'] }],
    category: 'public.app-category.education',
    minimumSystemVersion: '12.0.0',
    icon: 'build/icon.icns',
    identity: null,
    hardenedRuntime: false,
    notarize: false,
  },
  win: {
    target: [{ target: 'zip', arch: ['x64'] }],
    executableName: 'SkillTalents',
    icon: 'build/icon.ico',
    signExecutable: false,
    requestedExecutionLevel: 'asInvoker',
  },
};
