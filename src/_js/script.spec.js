describe('jquery plugin', () => {

  beforeEach(() => {
    $.fn.myPattern();
  });

  it('should show plugin as defined', () => {
    expect($.fn.myPattern).to.not.be.undefined;
    expect($.fn.myPattern.test.someAction).to.not.be.undefined;
  });

  it('should add a & b', () => {
    const data = {
      a: 2,
      b: 2,
    };
    expect($.fn.myPattern.test.someAction(data)).to.eql(4);
  });

});
