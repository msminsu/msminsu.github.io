# ------------------------------------------------------------------------
# Compass 설정 참고자료
# http://compass-style.org/help/documentation/configuration-reference/

# ------------------------------------------------------------------------
# Compass 플러그인 추가 
#require 'compass-normalize'
#require 'breakpoint'
#require 'susy'


# ------------------------------------------------------------------------
# 기본 언어 인코딩 설정
# Windows 사용자에게 주로 발생하는 오류(언어 인코딩: CP949)
Encoding.default_external = "utf-8"

# ------------------------------------------------------------------------
# 개발 또는 빌드 여부 환경설정
# :development
# :production
environment = :development


# ------------------------------------------------------------------------
# file-path 상대 경로 지정 설정 (localhost 작업시 상대 경로로 지정)
# relative_assets = true


# ------------------------------------------------------------------------
# 프로젝트 폴더 경로 지정
# ------------------------------------------------------------------------

http_path       = "/"
css_dir         = ""
css_path        = "assets/css"
sass_dir        = "assets/sass"
images_dir      = "assets/img"
# images_path   = "/"
# fonts_dir      = "fonts"


# ------------------------------------------------------------------------
# SASS => CSS 변경 시에 변경되는 아웃풋 스타일 설정
# :expanded
# :nested
# :compact  한줄씩
# :compressed  압축
 output_style = :compact
#output_style = (environment == :production) ? :compressed : :expanded


# ------------------------------------------------------------------------
# Sass 선호 문법 설정
  preferred_syntax = :scss

# ------------------------------------------------------------------------
# Sourcemap 사용 유무
sourcemap = false

# ------------------------------------------------------------------------
# sass-cache file 사용 유무
cache = false

# ------------------------------------------------------------------------
# 주석 사용 유무
line_comments = false;