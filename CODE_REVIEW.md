# Code Analysis and Changes
## Code Review based on the existing code:
1. For the books added to the reading list could show the percentage of pages read by the user using indicators until finished 
1. Cleanup just before Angular destroys the directive or component. Unsubscribe Observables and detach event handlers to avoid memory leaks
1. Can include the form validation via ngFormGroup/Form Control with respective fields

## Manually checked Accessibility issues:
1. The focus is not going on to the OKreads heading, where any of the screen readers cannot read it.
1. In search field to be read by VoiceOver aria label must be given
1. On tab, the focus is going onto buttons of book, But in VoiceOver the book names are not read, which helps user to know about the book they select