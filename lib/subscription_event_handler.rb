class SubscriptionEventHandler
  def call(event)
    puts "event.type: #{event.type}"
    begin
      method = "handle_" + event.type.tr('.', '_')
      puts "method: #{method}"
      self.send method, event
    # rescue JSON::ParserError => e
    #   # handle the json parsing error here
    #   raise # re-raise the exception to return a 500 error to stripe
    # rescue NoMethodError => e
    #   #code to run when handling an unknown event
    end
  end

  def handle_customer_subscription_deleted(event)
    binding.pry
  end
end