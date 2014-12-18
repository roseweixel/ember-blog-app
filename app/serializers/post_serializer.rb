class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :levelOfRage
end
