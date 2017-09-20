# Beer Viewer
A simple web application that consumes the
[BreweryDB API](http://www.brewerydb.com/developers/docs) and displays the
results. Uses [JQuery](https://jquery.com/).

## Usage
Set your API key environment variable; in bash:
```
export BDB_API_KEY="XXXXXXYOURKEYXXXXXX"
```
Run PHP in the top level directory of this repository:
```
php -S localhost:8000
```
Then navigate your web browser to `localhost:8000`.

## Notes
The following decisions have been made for fast prototyping and should be
changed before any live deployment:

- JQuery loads directly from the JQuery website rather than self-hosting.
- All files are left in their original state, without any minification or
  optimisation.
