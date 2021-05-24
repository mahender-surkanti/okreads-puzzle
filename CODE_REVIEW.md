# Code Analysis and Changes
## Code Review based on the existing code:
1. For the books added to the reading list could show the percentage of pages read by the user using indicators until finished 
1. Cleanup just before Angular destroys the directive or component. Unsubscribe Observables and detach event handlers to avoid memory leaks
1. Can include the form validation via ngFormGroup/Form Control with respective fields

## Manually checked Accessibility issues:
1. For the "img"(image) tag, there is no "alt"(alternative text). when the coverURL fail to fetch the image then alternate text would be helpful to know the image type
1. On tab, the focus is going onto buttons of book directly and the title of the book is not read by screen reader. Hence added tabindex for the book grid to read the title
1. When screen reader is "ON", The "Reading List" on the top navigation bar is just read as button. Hence added aria-haspopup and aria-expanded to read as side menubar is collapsed