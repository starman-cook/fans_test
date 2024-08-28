import {Model, Table, Column, PrimaryKey, DataType, NotNull} from 'sequelize-typescript'
import { uuid } from 'uuidv4'


@Table({
    tableName: 'users',
    timestamps: false,
})

export class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: uuid()
    })
    id!: string

    @NotNull
    @Column({
        allowNull: false
    })
    username!: string

    @NotNull
    @Column({
        allowNull: false,
    })
    password!: string

    @NotNull
    @Column({
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email!: string

    @Column({
        allowNull: true
    })
    phone!: string
}