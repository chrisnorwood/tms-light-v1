module Api::V1
  class UsersController < ApplicationController
    skip_before_action :authorize_request, only: :create
    
    # POST /api/v1/signup
    # return authenticated token upon signup

    def create
      user = User.create!(user_params)
      auth_token = AuthenticateUser.new(user.email, user.password).call
      response = { 
        message: Message.account_created,
        auth_token: auth_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        } 
      }
      json_response(response, :created)
    end

    def profile
      user_profile = {user: { id: current_user.id, name: current_user.name, email: current_user.email }}
      json_response(user_profile)
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  end
end