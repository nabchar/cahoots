class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def create
		@user = User.new(user_params)

		if @user.save
			login(@user)

      #subscribe User to general upon account creation
      default_channel = Channel.first.id
      @user.previous_channel_id = default_channel
      Subscription.create(user_id: @user.id, channel_id: default_channel)

      #set their status to active
      @user.active = true;

      @user.save

			render "api/users/show"
		else
			render json: @user.errors, status: 422
		end
	end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user.find_by(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

	private

	def user_params
		params.require(:user).permit(:username, :password, :email)
	end
end
