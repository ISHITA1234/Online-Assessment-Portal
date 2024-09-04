#include <stdio.h>

int main() {
    int a, b, temp;

    // Read two values from the user
    // printf("Enter the first value (a): ");
    scanf("%d", &a);

    // printf("Enter the second value (b): ");
    scanf("%d", &b);

    // Swap the values using a temporary variable
    temp = a;
    a = b;
    b = temp;

    // Print the swapped values
    // printf("\nAfter swapping:\n");
    printf("%d,", a);
    printf("%d", b);

    return 0;
}
