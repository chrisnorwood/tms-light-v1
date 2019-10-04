namespace :rspec do
  desc 'Run all rspec tests, with documentation formatting'
  task :documentation do
    exec 'bundle exec rspec spec --format documentation'
  end
end

task :rspec => 'rspec:documentation'