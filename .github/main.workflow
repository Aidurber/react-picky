workflow "New workflow" {
  on = "push"
  resolves = ["Build"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@9d4ef995a71b0771f438dd7438851858f4a55d0c"
  args = "tag"
}

action "Test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Filters for GitHub Actions"]
  args = "test"
}

action "Build" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Test"]
  args = "build"
}
