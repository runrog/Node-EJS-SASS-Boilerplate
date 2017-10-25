describe('jquery plugin', () => {

  beforeEach(() => {
    $.fn.myPattern();
  });

  it('plugin is defined', () => {
    expect($.fn.myPattern).to.not.be.undefined;
  });

});
