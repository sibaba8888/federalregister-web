class NewIssueProcessor < IssueProcessor
  @queue = :issue_processor

  def perform
    ActiveRecord::Base.clear_active_connections!
    
    compile_all_html
    expire_cache

    # used to avoid thundering herd after clearing sitewide cache
    sleep(60)

    deliver_mailing_lists
    update_sitemap!
  end

  private

  def expire_cache
    purge_cache(".*")
  end

  def deliver_mailing_lists
    DocumentSubscriptionQueuePopulator.perform(date)
  end

  def update_sitemap!
    Rails.application.load_tasks
    Rake::Task['sitemap:refresh'].invoke
  end

end
