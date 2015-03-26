var obj = {
  hoge: 'hoge',
  fn: function() {
  }
};

lo.l('aaa', obj);
lo.e('bbb', obj);
lo.i('ccc', obj);
lo.w('ddd', obj);

lo.isConsoleLog = false;
lo.l('aaa', obj);
lo.e('bbb', obj);
lo.i('ccc', obj);
lo.w('ddd', obj);

