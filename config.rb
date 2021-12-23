page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Load Sass from node_modules
config[:sass_assets_paths] << File.join(root, 'node_modules')

set :css_dir,    'assets/stylesheets'
set :fonts_dir,  'assets/fonts'
set :images_dir, 'assets/images'
set :js_dir,     'assets/javascripts'


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

activate :sprockets

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
