#include <stdio.h>
#include <math.h>

int main() {
    float radius, area, perimeter;

    printf("Enter the radius of the circle: ");
    scanf("%f", &radius);

    area = M_PI * radius * radius;
    perimeter = 2 * M_PI * radius;

    printf("%.2f,%.2f\n", area, perimeter);

    return 0;
}