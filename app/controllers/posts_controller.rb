class PostsController < ApplicationController
  def index
    render json: Post.all
  end

  def create
    safe_post = params.require(:post).permit(:body, :title, :levelOfRage)
    post = Post.create(safe_post)
    render json: post
  end

  def update
    safe_post = params.require(:post).permit(:body, :title, :levelOfRage)
    post = Post.find(params[:id])
    post.update(safe_post)
    render json: post
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    render json: {}
  end
end
