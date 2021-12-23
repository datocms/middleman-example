page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :development do
  activate :livereload
end

activate :directory_indexes
activate :dato
activate :pagination

ignore "/templates/*"


configure :build do
  activate :minify_css
  activate :minify_javascript
end

helpers do
  def markdown(text)
    renderer = Redcarpet::Render::HTML.new
    Redcarpet::Markdown.new(renderer).render(text)
  end

  def image_or_missing(image)
    if image
      yield image
    else
      image_tag "/images/missing-image.png"
    end
  end
end
