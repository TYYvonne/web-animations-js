suite('group-constructors', function() {
  setup(function() {
    document.timeline.players = [];
  });

  function simpleAnimationGroup() {
    return new AnimationSequence([
      new Animation(document.body, [], 2000),
      new AnimationGroup([
        new Animation(document.body, [], 2000),
        new Animation(document.body, [], 1000)
      ])
    ]);
  }

  test('player getter for children in groups, and __internalPlayer, work as expected', function() {
    var p = document.timeline.play(simpleAnimationGroup());
    assert.equal(p.source.player, p);
    assert.equal(p.childPlayers[0].source.player, p);
    assert.equal(p.childPlayers[1].source.player, p);
    assert.equal(p.childPlayers[1].childPlayers[0].source.player, p);
    assert.equal(p.childPlayers[1].childPlayers[1].source.player, p);

    assert.equal(p.source._internalPlayer.source, p.source);
    assert.equal(p.childPlayers[0].source._internalPlayer.source, p.childPlayers[0].source);
    assert.equal(p.childPlayers[1].source._internalPlayer.source, p.childPlayers[1].source);
    assert.equal(p.childPlayers[1].childPlayers[0].source._internalPlayer.source, p.childPlayers[1].childPlayers[0].source);
    assert.equal(p.childPlayers[1].childPlayers[1].source._internalPlayer.source, p.childPlayers[1].childPlayers[1].source);
  });
});