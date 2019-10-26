class ApplicationController < ActionController::API
  # this allows my controller to render html, for my fallback_index_html method
  include ActionController::MimeResponds
  
  include Response
  include ExceptionHandler

  # called before every action on controllers
  before_action :authorize_request, except: :fallback_index_html
  attr_reader :current_user

  # define fallback url
  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  private

  # check for valid request token and return user
  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
