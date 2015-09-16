# -*- coding: utf-8 -*-
from app import create_app
  
if __name__ == "__main__":
    app = create_app()
    app.logger.info("Debug status is: " + str(app.config['DEBUG']))
    app.run(debug=app.config.get('DEBUG'), host='0.0.0.0', port=80)
