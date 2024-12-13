import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { RouterModule,Routes } from '@angular/router';
import { ProductComponent } from './components/contant/product/product.component';
import { HeaderComponent } from './components/sharedComponents/header/header.component';
import { HomeComponent } from './components/contant/home/home.component';
import { FooterComponent } from './components/sharedComponents/footer/footer.component';
import{HttpClientModule} from '@angular/common/http';
import { ContactComponent } from './components/contant/contact/contact.component';
import { BlogsComponent } from './components/contant/blogs/blogs.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/contant/dashboard/dashboard.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { NotFoundComponent } from './components/contant/not-found/not-found.component';
import { UserComponent } from './components/contant/user/user.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductDetailComponent } from './components/contant/product-detail/product-detail.component';
import { UserCartComponent } from './components/contant/user-cart/user-cart.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { PayComponent } from './components/contant/pay/pay.component';



const Router:Routes=[
  {path:"",component:HomeComponent},
  {path:"Home",component:HomeComponent},
  {path:"Products",component:ProductComponent},
  {path:"Product Detail/:id",component:ProductDetailComponent},
  {path:"User Cart",component:UserCartComponent},
  {path:"",component:AdminDashboardComponent},
  {path:"Admin Dashboard",component:AdminDashboardComponent},
  {path:"users",component:UserComponent},
  {path:"Contact",component:ContactComponent},
  {path:"Pay",component:PayComponent},
  {path:"**",component:NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContactComponent,
    BlogsComponent,
    DashboardComponent,
    UserViewComponent,
    AdminViewComponent,
    NotFoundComponent,
    UserComponent,
    AdminDashboardComponent,
    ProductDetailComponent,
    UserCartComponent,
    PayComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Router),
    RouterModule.forChild(Router),
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     'clientId'
          //   )
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(' 7672991056129146')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
