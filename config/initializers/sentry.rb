Sentry.init do |config|
  config.dsn = 'https://24b7a0be91214f9fab5503e7b5269f05@o4505309700292608.ingest.sentry.io/4505319742898176'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]

  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end