module Api::V1
  class AuthenticationController < ApplicationController
    skip_before_action :authorize_request, only: :authenticate

    wrap_parameters format: []
    # return auth token once user is authenticated
    def authenticate
      auth_token = 
        AuthenticateUser.new(auth_params[:email], auth_params[:password]).call

      simulate_header = {'Authorization' => "Bearer: #{auth_token}"}
      current_user = (AuthorizeApiRequest.new(simulate_header).call)[:user]
      json_response({
        auth_token: auth_token,
        user: {
          id: current_user.id,
          name: current_user.name,
          email: current_user.email
        }
      })
    end

    private
    
    def auth_params
      params.permit(:email, :password)
    end
  end
end