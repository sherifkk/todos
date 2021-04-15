# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task, only: %i[ update destroy ]

  def index
    @tasks = current_user.tasks.order(completed: :desc).order(:created_at)
  end

  def create
    @task = current_user.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: { errors: @task.errors }, status: :unproccesable_entity
    end
  end

  def update
    if task_params[:file]
      @task.attachment.attach(task_params[:file])
    end
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors }, status: :unproccesable_entity
    end
  end

  def destroy
    if @task.destroy
      head :no_content
    else
      render json: { errors: @task.errors }, status: :unproccesable_entity
    end
  end

  private
    def set_task
      @task = current_user.tasks.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :completed, :deadline, :description, :file)
    end
end
