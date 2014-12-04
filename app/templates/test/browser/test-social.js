suite('network', function () {
  this.timeout(15000);

  suiteSetup(loadUsers);

  test('signIn hommer', function (done) {
    hoodie.account.signIn('Hommer', '123')
      .fail(function (err) {
        done();
        assert.ok(false, err.message);
      })
      .done(function () {
        assert.equal(
          hoodie.account.username,
          'hommer',
          'should be logged in after signup'
        );
        done();
      });
  });

  test('hommer should subscribe bart posts', function (done) {
    hoodie.<%= generatorName %>.follow('Bart')
      .fail(function (err) {
        done((err.message !=='You already subscribed.') ? err: null);
        assert.ok(false, err.message);
      })
      .then(function () {
        done();
        assert.ok(true, 'follow with sucess');
      });
  });

  test('hommer should not subscribe bart posts', function (done) {
    hoodie.<%= generatorName %>.follow('Bart')
      .fail(function (err) {
        done();
        assert.ok((err.message ==='You already subscribed.'), err.message);
      })
      .then(function () {
        done();
        assert.ok(false, 'should throw error [You already subscribed.] ');
      });
  });

  test('hommer should subscribe marge posts', function (done) {
    hoodie.<%= generatorName %>.follow('Margie')
      .fail(function (err) {
        done((err.message !=='You already subscribed.')? err: null);
        assert.ok(false, err.message);
      })
      .then(function () {
        assert.ok(true, 'follow with sucess');
        done();
      });
  });

  test('hommer should subscribe lisa posts', function (done) {
    hoodie.<%= generatorName %>.follow('Lisa')
      .fail(function (err) {
        done((err.message !=='You already subscribed.')? err: null);
        assert.ok(false, err.message);
      })
      .then(function () {
        assert.ok(true, 'follow with sucess');
        done();
      });
  });

  test('hommer should show 3 following', function (done) {
    hoodie.<%= generatorName %>.following()
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function (task) {
        assert.ok((task.following.length === 3) , 'following ' + task.following.length + ' with sucess');
        done();
      });
  });

  test('hommer should show 0 followers', function (done) {
    hoodie.<%= generatorName %>.followers()
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function (task) {
        assert.ok((task.followers.length === 0) , 'followers ' + task.followers.length + ' with sucess');
        done();
      });
  });

  test('hommer should unsubscribe bart posts', function (done) {
    hoodie.<%= generatorName %>.unfollow('Bart')
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function () {
        assert.ok(true, 'follow with sucess');
        done();
      });
  });

  test('hommer should show 2 following', function (done) {
    hoodie.<%= generatorName %>.following()
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function (task) {
        assert.ok((task.subscriptions.length === 2) , 'subscriptions ' + task.subscriptions.length + ' with sucess');
        done();
      });
  });

  test('lisa should show 1 followers', function (done) {
    hoodie.<%= generatorName %>.followers('Lisa')
      .fail(function (err) {
        done(err);
        assert.ok(false, err.message);
      })
      .then(function (task) {
        assert.ok((task.followers.length === 1) , 'followers ' + task.followers.length + ' with sucess');
        done();
      });
  });
});

