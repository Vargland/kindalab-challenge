import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Subscription, delay, tap } from 'rxjs';

import { LoaderService } from '@utils';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy {
    public showSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private subscriptions: Subscription = new Subscription();

    constructor(public loaderService: LoaderService) { }

    public ngOnInit(): void {
        this.loaderService.setLoading(false);
        this.subscriptions.add(
            this.loaderService.isLoading$
                .pipe(
                    delay(0),
                    tap(result => this.showSpinner$.next(result!))
                )
                .subscribe()
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
