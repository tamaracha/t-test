import angular from 'angular';
import pick from 'lodash.pick';
export default /*@ngInject*/function(Big, $window){
  const twoSided = [0.5, 0.75, 0.8, 0.85, 0.9, 0.95, 0.98, 0.99, 0.998];
  const oneSided = [0.75, 0.875, 0.9, 0.925, 0.95, 0.975, 0.99, 0.995, 0.999];
  function stats(data, method){
    let stats;
    switch(method){
    case 'twoSample':
      stats = twoSample(data);
      break;
    case 'welch':
      stats = welch(data);
      break;
    case 'paired':
      stats = paired(data);
      break;
    case 'oneSample':
      stats = oneSample(data);
      break;
    default: return;
    }
    if(stats.df.cmp(0) === 1) {
      const dist = new $window.jStat.studentt(parseInt(stats.df));
      stats.p = new Big(dist.cdf(parseFloat(stats.t)));
      stats.twoSided = [];
      angular.forEach(twoSided, function(val){
        stats.twoSided.push(new Big(dist.inv(val)));
      });
      stats.oneSided = [];
      angular.forEach(oneSided, function(val){
        stats.oneSided.push(new Big(dist.inv(val)));
      });
    }
    return stats;
  }

  function twoSample(d){
    if(!d){throw new Error('missing data');}
    const params = ['m1', 'm2', 'n1', 'n2', 's1', 's2'];
    d = pick(d, params);
    angular.forEach(params, function(key){
      if(d[key] === undefined){throw new Error('missing '+key);}
      if(d[key] instanceof Big === false){d[key] = new Big(d[key]);}
    });
    const sp = ((d.n1.minus(1).times(d.s1.pow(2)).plus(d.n2.minus(1).times(d.s2.pow(2)))).div(d.n1.plus(d.n2).minus(2))).sqrt();
    const t = d.m1.minus(d.m2).div(sp.times((d.n1.pow(-1).plus(d.n2.pow(-1))).sqrt()));
    const df = d.n1.plus(d.n2).minus(2);
    return {t, df, sp};
  }

  function paired(d){
    if(!d){throw new Error('missing data');}
    const params = ['m', 'n', 's', 'mu'];
    d = pick(d, params);
    if(!d.mu){d.mu = new Big(0);}
    angular.forEach(params, function(key){
      if(!d[key]){throw new Error('missing '+key);}
      if(d[key] instanceof Big === false){d[key] = new Big(d[key]);}
    });
    const t = (d.m.minus(d.mu)).div(d.s.div(d.n.sqrt()));
    const df = d.n.times(2).minus(2);
    return {t, df};
  }

  function welch(d){
    if(!d){throw new Error('missing data');}
    const params = ['m1', 'm2', 'n1', 'n2', 's1', 's2'];
    d = pick(d, params);
    angular.forEach(params, function(key){
      if(!d[key]){throw new Error('missing '+key);}
      if(d[key] instanceof Big === false){d[key] = new Big(d[key]);}
    });
    const t = d.m1.minus(d.m2).div( (d.s1.pow(2).div(d.n1).plus(d.s2.pow(2).div(d.n2))).sqrt() );
    const df = (d.s1.pow(2).div(d.n1).plus(d.s2.pow(2).div(d.n2))).pow(2).div( (d.s1.pow(2).div(d.n1)).pow(2).div(d.n1.minus(1)).plus( (d.s2.pow(2).div(d.n2)).pow(2).div(d.n2.minus(1)) ) );
    return {t, df};
  }

  function oneSample(d){
    if(!d){throw new Error('missing data');}
    const params = ['m', 'n', 's', 'mu'];
    d = pick(d, params);
    if(!d.mu){d.mu = new Big(0);}
    angular.forEach(params, function(key){
      if(d[key] === undefined){throw new Error('missing '+key);}
      if(d[key] instanceof Big === false){d[key] = new Big(d[key]);}
    });
    const  df = d.n.minus(1);
    const  t = (d.m.minus(d.mu)).div(d.s.div(d.n.sqrt()));
    return {t, df};
  }
  return {
    stats,
    twoSample,
    paired,
    welch,
    oneSample,
    twoSided,
    oneSided
  };
}
