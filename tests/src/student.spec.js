describe("student factory", function() {
  'use strict';
  var Big, student;
  beforeEach(angular.mock.module('calculator'));
  beforeEach(angular.mock.inject(function(_student_, _Big_) {
    student = _student_;
    Big = _Big_;
  }));

  describe('two sample', function(){
    it("reject missing data", function(){
      expect(function(){
        student.twoSample();
      }).toThrow(new Error('missing data'));
    });
    it("accept Big numbers", function() {
      expect(function(){
        var stats = student.twoSample({
          m1: new Big(30),
          m2: new Big(30),
          n1: new Big(20),
          n2: new Big(20),
          s1: new Big(3),
          s2: new Big(3)
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it("accept native numbers", function() {
      expect(function(){
        var stats = student.twoSample({
          m1: 30,
          m2: 30,
          n1: 20,
          n2: 20,
          s1: 3,
          s2: 3
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it('reject missing m1', function(){
      expect(function(){
        student.twoSample({
          m2: 30,
          n1: 40,
          n2: 40,
          s1: 2,
          s2: 2
        });
      }).toThrow(new Error('missing m1'));
    });
  });

  describe('paired', function(){
    it("reject missing data", function(){
      expect(function(){
        student.paired();
      }).toThrow(new Error('missing data'));
    });
    it("accept native numbers", function() {
      expect(function(){
        var stats = student.paired({
          m: 3,
          n: 20,
          s: 2
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it('accept Big numbers', function(){
      expect(function(){
        var stats = student.paired({
          m: new Big(4),
          n: new Big(40),
          s: new Big(3)
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it('respect mu', function(){
      expect(student.paired({
        m: 4,
        n: 40,
        s: 3,
        mu: 30
      })).toBeTruthy();
    });
    it('reject missing m', function(){
      expect(function(){
        student.paired({
          n: 40,
          s: 2,
        });
      }).toThrow(new Error('missing m'));
    });
  });

  describe('welch', function(){
    it("reject missing data", function(){
      expect(function(){
        student.welch();
      }).toThrow(new Error('missing data'));
    });
    it("accept Big numbers", function() {
      expect(function(){
        var stats = student.welch({
          m1: new Big(30),
          m2: new Big(30),
          n1: new Big(20),
          n2: new Big(20),
          s1: new Big(3),
          s2: new Big(3)
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it("accept native numbers", function() {
      expect(function(){
        var stats = student.welch({
          m1: 30,
          m2: 30,
          n1: 20,
          n2: 20,
          s1: 3,
          s2: 3
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it('reject missing m1', function(){
      expect(function(){
        student.welch({
          m2: 30,
          n1: 40,
          n2: 40,
          s1: 2,
          s2: 2
        });
      }).toThrow(new Error('missing m1'));
    });
  });

  describe('one sample', function(){
    it("reject missing data", function(){
      expect(function(){
        student.oneSample();
      }).toThrow(new Error('missing data'));
    });
    it("accept native numbers", function() {
      expect(function(){
        var stats = student.oneSample({
          m: 30,
          n: 20,
          s: 3
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it("accept Big numbers", function() {
      expect(function(){
        var stats = student.oneSample({
          m: new Big(30),
          n: new Big(20),
          s: new Big(3)
        });
        if(stats.t instanceof Big === false){return false;}
        if(stats.df instanceof Big === false){return false;}
        return true;
      }()).toBeTruthy();
    });
    it('reject missing m', function(){
      expect(function(){
        student.oneSample({
          n: 40,
          s: 2,
        });
      }).toThrow(new Error('missing m'));
    });
    it('respect mu', function(){
      expect(student.oneSample({
        m: 4,
        n: 40,
        s: 3,
        mu: 30
      })).toBeTruthy();
    });
  });
  
  describe('stats', function(){
    var data_two = {
      m1: 30,
      m2: 35,
      n1: 40,
      n2: 40,
      s1: 3,
      s2: 3
    };
    it('accept twoSample method', function(){
      expect(student.stats(data_two, 'twoSample')).toBeTruthy();
    });
    it('accept welch method', function(){
      expect(student.stats(data_two, 'welch')).toBeTruthy();
    });
    var data_one = {
      m: 4,
      n: 30,
      s: 3
    };
    it('accept paired method', function(){
      expect(student.stats(data_one, 'paired')).toBeTruthy();
    });
    it('accept oneSample method', function(){
      expect(student.stats(data_one, 'paired')).toBeTruthy();
    });
    it('refuse other methods', function(){
      expect(student.stats(data_two, 'xyz')).toBeFalsy();
    });
    it('skip p value on df=0', function(){
      expect(student.stats({
        m: 4,
        n: 1,
        s: 2
      }, 'oneSample').p).toBeFalsy();
    });
  });

});
